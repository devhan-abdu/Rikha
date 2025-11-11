type Props = {
    header: string;
}

export default function Common({ header }: Props) {
    return (
        <section className="relative pt-6 ">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div></div>
            <div className="flex flex-col  items-center justify-center gap-6  py-8 px-6">
                <h1 className="font-cinzel text-center text-2xl sm:text-3xl  lg:text-4xl  font-bold  capitalize ">{header}</h1>
            </div>

        </section>


    )

}