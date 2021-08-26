export const fileUpload=async(file)=>{
const cloudinaryURL='https://api.cloudinary.com/v1_1/lanadevolada/upload'
const formData= new FormData();
formData.append('upload_preset','react-jorunal');
formData.append('file',file[0]);
console.log(file)
try {
    const resp=await fetch(cloudinaryURL,{
        method:'POST',
        body:formData 
    });
    if (resp.ok) {
        const cloudResp=await resp.json();
        return cloudResp.secure_url;
    }else{
        throw await resp.json()
    }

} catch (error) {
    console.log(error)
}

}