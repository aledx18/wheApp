import {
  IconHum,
  IconLocation,
  IconPre,
  IconRain,
  IconSunny,
  IconWind
} from './icons/icons'

interface IfechaPro {
  fecha: string
}

export default function Loading(props: IfechaPro) {
  const { fecha } = props

  return (
    <div className='bg-sky-100 flex flex-col rounded-xl shadow-md items-center text-center'>
      <div className='px-2 flex flex-col'>
        <div className='flex gap-2 items-center pt-4'>
          <IconLocation />
          <h2 className='text-xl'> regin </h2>
          <h3 className='text-xl'> country </h3>
        </div>
        <div>
          <p className='text-lg'> {fecha} </p>
        </div>
      </div>
      <div className=' flex flex-col items-center'>
        <IconSunny />
        <h1 className='text-2xl'>condition </h1>
        <div className='flex text-center items-center gap-4 mt-2'>
          <div> Max°c</div>
          <div className='flex items-center text-center'>
            <h1 className='text-6xl py-2 font-medium'>!°c </h1>
          </div>
          <div>Min°c</div>
        </div>
        <div className='flex justify-around w-full my-5'>
          <div className='flex items-center'>
            <IconHum />
            <p className='text-sm font-medium'> humidity%</p>
          </div>
          <div className='flex items-center'>
            <IconWind />
            <p className='text-sm font-medium'>wind Km/h</p>
          </div>
          <div className='flex items-center'>
            <IconPre /> <p className='text-sm font-medium'>pressure mH</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col pt-4 bg-white rounded-t-3xl rounded-b-xl '>
        <div className='flex w-full items-center text-center pb-2'>
          <div className=' flex shadow-md border border-violet-200 px-4 py-3 rounded-xl'>
            <div className='flex flex-col items-center'>
              <h3>03:00 </h3>
              <IconRain />
              <h4>temp°c</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
