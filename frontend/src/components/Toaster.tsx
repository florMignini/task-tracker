import { alertType } from '../pages/Register'

export const Toaster = (alert: alertType) => {

    return (
    <h3
    className={`${alert.error ? 'bg-red-400' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center text-sm font-bold mt-2 p-2 rounded text-white`}
    >{alert.msg}</h3>
  )
}
