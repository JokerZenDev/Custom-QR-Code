import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

const defaultUrl = "https://jokerzen.dev"

function App() {
	const [url, setUrl] = useState(defaultUrl)
	const [logo, setLogo] = useState("")
  const [error, setError] = useState("")

	const size = 256

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
    setError("")
		const formData = new FormData(e.currentTarget)
		const formUrl = formData.get("url") as string
		if (!formUrl) {
      setError("url")
      return
		}
    setUrl(formUrl)

		const formLogo = formData.get("logo") as File
		if (formLogo) {
			const reader = new FileReader() // Create a FileReader

			reader.onload = function (e) {
				setLogo(e.target?.result as string)
			}

			reader.readAsDataURL(formLogo) // Read the file as a Data URL
		}
	}

	return (
		<main className='min-w-screen min-h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-10 items-center'>
        <h1 className="text-5xl font-bold">QR Code Generator</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-2'>
					<input
						type='text'
						name='url'
            placeholder={defaultUrl}
						className={`p-2 border ${error === "url" && "border-red-500"}`}
					/>
					<div className="flex items-center">
						<label
							className='p-2 border bg-gray-500 text-white active:bg-gray-700'
							htmlFor='file_input'
						>
							Choose file
						</label>
						<input
							type='file'
							id='file_input'
							name='logo'
              aria-describedby="file_input_help"
							className='text-gray-500 file:hidden p-2 border'
						/>
					</div>
					<button type='submit' className="p-2 border bg-blue-500 text-white active:bg-blue-700">Submit</button>
				</form>
				{url && (
					<QRCodeCanvas
						value={url}
						size={size}
						level='L'
						imageSettings={{
							src: logo,
							height: logo ? size / 5 : 0,
							width: logo ? size / 5 : 0,
							excavate: true,
						}}
					/>
				)}
			</div>
		</main>
	)
}

export default App
