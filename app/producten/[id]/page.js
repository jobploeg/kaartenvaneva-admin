import { getProduct } from "../../../lib/supabaseAPI";
import Product from "../../../components/product";

export default async function Page({ params }) {
  const products = await getProduct(params.id);
  const product = products[0];

  return (
    <>
      <Product product={product} />
    </>
  );
}
