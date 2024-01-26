import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";
import Header from "./components/Header";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [errorDisplay, setErrorDisplay] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {
        id: youtubeID
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }


    axios(options)
      .then((res) => {
        if (res.data.link) {
          setUrlResult(res.data.link)
        } else {
          console.log(res.data.msg) 
          setErrorDisplay("Something went wrong. Enter a valid youtube link.")
        }
      }) 
      .catch ((error) => {
        if (error.data) { // status code out of the range of 2xx
          console.log("Data :" , error.data);
          console.log("Status :" + error.data.status);
        } else if (error.request) { // The request was made but no response was received
          console.log(error.request);
        } else {// Error on setting up the request
          console.log('Error', error.data.msg);
        }
      })
      // .catch (error => console.log(error))
    inputUrlRef.current.value = '';
  }

  return (
    <div>
    <Header />
    <div className="flex-col justify-center items-center pt-44">
      <div className="">
              <h1 className='flex font-karla justify-center font-bold lg:text-4xl md:text-3xl sm:text-3xl pb-3 text-2xl'>Youtube to MP3 Converter</h1>
              <p className="flex font-karla justify-center text-s pb-10">Convert a Youtube Video to MP3!</p>
          </div>
          
          <form onSubmit={handleSubmit} className='flex font-karla justify-center p-2 mx-16'>
              <input ref={inputUrlRef} className='bg-slate-300 p-2 w-80' 
              type="text" id="ytId" placeholder='Paste Youtube link here' autoComplete="off"/>
              <button className='bg-slate-300 p-2 ml-2 rounded hover:bg-slate-200 transition-all' type='submit' id='convert-button'>Convert</button>
          </form>

          <div className="flex justify-center mt-10">
            {errorDisplay ? <h1>{errorDisplay}</h1> : ""}
          </div>

          <div className="flex justify-center mt-10">
            {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult}
            className="font-karla bg-blue-500 text-white p-2 
            rounded font-semibold transition-color duration-200 hover:bg-blue-400">Download MP3</a> : ''}
          </div>
      </div>
    </div>
        
  )
}

export default App