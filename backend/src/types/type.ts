export type SanityProduct = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};
export type sanityCategory = {
  _id: string,
  name: string,
  slug: { _type: 'slug', current: string },
  description?: string,
  image?: any;
}

export type review = {
 userId:number,
 productId:string,
 rating:number,
 comment:string
}