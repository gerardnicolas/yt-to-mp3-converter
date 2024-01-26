import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";
import Header from "./components/Header";
import Footer from "./components/Footer"

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [errorDisplay, setErrorDisplay] = useState("")
  const [songTitle, setSongTitle] = useState("")
  
  function handleSubmit(event){
    event.preventDefault()
    const youtubeId = youtube_parser(inputUrlRef.current.value)

    axios ({
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {
        id: youtubeId
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    })
      .then((res) => {
        if (res.data.link){
          setUrlResult(res.data.link)
          setSongTitle(res.data.title)
          console.log("Successfully fetched data!")
          setErrorDisplay("")
        } else if (!res.data.link){
          console.log(`Error: ${res.data.msg}`)
          setErrorDisplay("Enter a valid youtube link.")
          setSongTitle("")
          setUrlResult("")
        }
      })
    inputUrlRef.current.value = '';
  }

  return (
    <div>

      <Header />
      <div className="flex-col justify-center items-center pt-32">
        <div className="">
          <h1 className='flex font-karla justify-center font-bold lg:text-4xl md:text-3xl sm:text-3xl pb-3 text-2xl'>Youtube to MP3 Converter</h1>
          <p className="flex font-karla justify-center text-s pb-10">Convert a Youtube Video to MP3!</p>
        </div>
            
        <form onSubmit={handleSubmit} className='flex font-karla justify-center p-2 mx-16'>
          <input ref={inputUrlRef} className='bg-slate-300 p-2 w-80' 
          type="text" id="ytId" placeholder='Paste Youtube link here' autoComplete="off"/>
          <button className='bg-slate-300 p-2 ml-2 rounded hover:bg-slate-200 transition-all' type='submit' id='convert-button'>Convert</button>
        </form>

        {urlResult && songTitle ? <div className="flex-col justify-center mt-14 font-karla text-s px-9 text-center">
          {songTitle ? <h1 className="mb-5"><span className="font-bold">Title:</span> {songTitle}</h1> : ""}
          {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult}
          className="font-karla bg-blue-500 text-white p-2 
          rounded font-semibold transition-color duration-200 hover:bg-blue-400">Download MP3</a> : ''}
        </div> : ""}

        <div className="flex justify-center mt-1 font-karla text-red-500">
          {errorDisplay ? <h1>{errorDisplay}</h1> : ""}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default App