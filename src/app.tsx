import { useEffect, useState } from 'preact/hooks'
import getClima from './components/getWheater'
import { Tab } from '@headlessui/react'
import {
  IconLocation,
  IconSunny,
  IconPre,
  IconHum,
  IconWind,
  IconDot,
  IconRain
} from './components/icons/icons'
import Loading from './components/loading'

interface IHourData {
  temp_c: number
  time: string
  icon: number
}

export function App() {
  const [text, setText] = useState<{
    region: string
    country: string
    temp: number
    day: number
    condition: string
    icon: number
    wind: number
    pressure: number
    humidity: number
    maxPredictDay: number
    minPredictDay: number
    hoursOne: IHourData[]
    hoursTwo: IHourData[]
    hoursThree: IHourData[]
  }>()
  const [fecha, setFecha] = useState<string>('')

  const ahora = new Date()
  const mesActual = ahora.toLocaleString('default', { month: 'long' })
  const fechaActual = `${ahora.getDate()} ${mesActual}`
  setFecha(fechaActual)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError)
    } else {
      console.log('Geolocalización no está soportada en este navegador')
    }

    function showPosition(position: {
      coords: { latitude: number; longitude: number }
    }) {
      getClima(position.coords).then((coords) => {
        setText(coords)
        localStorage.setItem('clima', JSON.stringify(coords))
      })
    }
  }, [])

  function showError(error: { message: string }) {
    alert('Error al obtener la ubicación: ' + error.message)
  }

  return (
    <section className='h-screen flex justify-center items-center py-2'>
      {text ? (
        <div className='bg-sky-100 flex flex-col rounded-xl shadow-md items-center text-center'>
          <div className='px-2 flex flex-col'>
            <div className='flex gap-2 items-center pt-4'>
              <IconLocation />
              <h2 className='text-xl'> {text.region} </h2>
              <h3 className='text-xl'> {text.country} </h3>
            </div>
            <div>
              <p className='text-lg'> {fecha} </p>
            </div>
          </div>
          <div className=' flex flex-col items-center'>
            <IconSunny />
            <h1 className='text-2xl'>{text.condition} </h1>
            <div className='flex text-center items-center gap-4 mt-2'>
              <div> Max {text.maxPredictDay}°c</div>
              <div className='flex items-center text-center'>
                <h1 className='text-6xl py-2 font-medium'>{text.temp}°c </h1>
              </div>
              <div>Min {text.minPredictDay}°c</div>
            </div>
            <div className='flex justify-around w-full my-5'>
              <div className='flex items-center'>
                <IconHum />
                <p className='text-sm font-medium'> {text.humidity}%</p>
              </div>
              <div className='flex items-center'>
                <IconWind />
                <p className='text-sm font-medium'>{text.wind} Km/h</p>
              </div>
              <div className='flex items-center'>
                <IconPre />{' '}
                <p className='text-sm font-medium'>{text.pressure} mH</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-white pt-4 rounded-t-3xl rounded-b-xl '>
            <Tab.Group>
              <Tab.Panels className='flex'>
                <Tab.Panel className='flex w-full items-center text-center'>
                  {text.hoursOne.map((h) => (
                    <div
                      key={h.time}
                      className=' flex shadow-md border border-violet-200 px-4 py-3 rounded-xl'
                    >
                      <div className='flex flex-col items-center'>
                        <h3> {h.time.slice(11, 16)}</h3>
                        <IconRain />
                        <h4>{Math.round(h.temp_c)}°c</h4>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>

                <Tab.Panel className='flex justify-around w-full items-center text-center'>
                  {text.hoursTwo.map((h) => (
                    <div
                      key={h.time}
                      className='flex shadow-md border border-violet-200 px-4 py-3 rounded-xl'
                    >
                      <div className='flex flex-col items-center'>
                        <h3> {h.time.slice(11, 16)}</h3>
                        <IconRain />
                        <h4>{Math.round(h.temp_c)}°c</h4>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
                <Tab.Panel className='flex justify-around w-full items-center text-center'>
                  {text.hoursThree.map((h) => (
                    <div
                      key={h.time}
                      className='flex shadow-md border border-violet-200 px-4 py-3 rounded-xl'
                    >
                      <div className='flex flex-col items-center'>
                        <h3> {h.time.slice(11, 16)}</h3>
                        <IconRain />
                        <h4>{Math.round(h.temp_c)}°c</h4>
                      </div>
                    </div>
                  ))}
                </Tab.Panel>
              </Tab.Panels>
              <Tab.List className='flex justify-center my-4'>
                <Tab>
                  <IconDot />
                </Tab>
                <Tab>
                  <IconDot />
                </Tab>
                <Tab>
                  <IconDot />
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        </div>
      ) : (
        <Loading fecha={fecha} />
      )}
    </section>
  )
}
