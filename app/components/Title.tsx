type TitleProps = {
  title: string
}

const Title = ({ title }: TitleProps) => (
  <div className="mb-2">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-xl">
        <div className="px-2 bg-gray-100 text-gray-500">{title}</div>
      </div>
    </div>
  </div>
)

export default Title
