import {reactLocalStorage} from 'reactjs-localstorage';

export const isAuthorize = () => {
    const uri = window.location.href
    const me = reactLocalStorage.getObject('me') || null

    if (!me)
        return false

    const module = uri.substring(uri.lastIndexOf('/') + 1)
    const userRoleName = me.role_name.toLowerCase()

    let notAllowedMenu = []

    if (userRoleName === 'employee')
        notAllowedMenu = ["barang", "pengadaan", "karyawan"]
    else if (userRoleName === 'manager')
        notAllowedMenu = ["barang", "karyawan"]

    if (notAllowedMenu.includes(module)) {
        console.log("masuk sini engga")
        return false
    }

    return true
}
