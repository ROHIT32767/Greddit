import axios from 'axios'
import swal from 'sweetalert'

const postEmail = (Obj) => {
    return axios.post(email_url,Obj).then((result) => {
        if(result.status === 200){
            console.log("post body",result.data.status)
            if(result.data.status === 1){
                swal("Email Already Verified","your email has already started receiving alerts","success")
            }else{
                swal("Email Sent","Kindly check in your mailbox ( possibly spam folder) to verify your email","success");
            }
        }
    }).catch(() => {
        swal("Invalid email","","error");
    })
}
var Server = {postEmail}
export default Server

// TODO: dynrohttajaytzob