import { Category } from "@/interface";
import Image from "next/image";
import Link from "next/link";

export const CategorySection = async ({
    fetchCategories,
}: {
    fetchCategories: () => Promise<Category[]>;
}) => {
    const categories = await fetchCategories();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-3 gap-y-6 max-w-fit mx-auto">
            {categories.length === 0 ? (
                <p className="text-gray-500"> No Category Found</p>
            ) : (
                categories.map((category) => (
                    <div
                        className="mx-auto rounded-2xl flex flex-col items-center justify-center "
                        key={category.id}
                    >
                        <div className="flex items-center justify-center h-[100px] w-full">
                            <Image
                                src={category.image}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                                className="object-contain w-full h-full"
                            />
                        </div>
                        <div className="h-full flex flex-col justify-between"></div>
                        <p className="font-cinzel capitalize mt-3">{category.name}</p>
                        <Link
                            href={{
                                pathname: "/category",
                                query: { slug: category.slug },
                            }}
                            className="text-sm text-primary hover:scale-105 cursor-pointer transition-all duration-300"
                        >
                            Explore more
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};
