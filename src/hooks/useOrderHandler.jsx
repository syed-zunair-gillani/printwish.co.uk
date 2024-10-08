import { apiRequest } from "@/config/requests";
import { orderData } from "../../public/data";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearAll } from "@/features/AddToCart";
import api from "../config/api";

const useOrderHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const OrderSubmit = async (allCartItems) => {
    allCartItems?.map(({ title, id, quantity, price, extra, sku }) => {
      // ceate data for size color namd quantity -> Blue: M(4), L(2)
      const result = extra?.colors
        ?.map((item) => {
          const sizes = item.selectedSize
            .map((size) => `${size.name}(${size.quantity})`)
            .join(", ");
          return `${item.name}: ${sizes}`;
        })
        .join("\n");

      // array concate
      const mergedArray = extra?.textCreator.concat(extra?.designArtWork);

      // ceate data for customization
      {
        /* achiving result
               Line 1 : {
                    color : "Black",
                    font : "Black One",
                    name : "line-1",
                    size : "Medium",
                    text : "line on1"
               }
               */
      }

      const customization = mergedArray
        ?.map((item) => {
          return `  --------------------------------------
                         customisation Name : ${item.customisationName}
                         Position : ${item.designPosition}
                         Width : ${item.designWidth}
                         ImageURL : ${item.imageURL}
                         special Instruction : ${item.specialInstruction}
                    -------------------------------------- 
                    `;
        })
        .join("\n")
        .toString();

      const coloSizesAndQuantityMeta = `${result}`;
      // claculate vat for product
      const singleProductVat = parseInt(((20 / 100) * +price).toFixed(2));
      const priceWithVat = Number(price) + Number(singleProductVat);

      // line Items
      const lineItem = {
        name: title,
        product_id: id,
        quantity: quantity,
        total: `${priceWithVat}`,
        meta_data: [
          {
            key: "Color, Sizes & Quantity",
            value: coloSizesAndQuantityMeta,
          },
          {
            key: "_sku",
            value: sku,
          },
          {
            key: "VAT",
            value: `£${singleProductVat}`,
          },
          {
            key: "Customization",
            value: customization,
          },
        ],
      };

      orderData.line_items.push(lineItem);
    });

    try {
      const res = await api.post("orders", orderData);
      if (res.status === 201) {
        toast.info("Order Marked");
        dispatch(clearAll());
        router.push("/");
      }
    } catch (error) {
      console.log("🚀 ~ FetchData ~ error:", error);
    }
    // const responce = await apiRequest('POST', 'create-order', orderData)
    // if (responce.status === 201) {
    //      toast.info("Order Marked");
    //      dispatch(clearAll())
    //      router.push('/')
    // }
  };

  return { OrderSubmit };
};

export default useOrderHandler;
