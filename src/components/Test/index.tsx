import { action } from "@storybook/addon-actions"
import axios from "axios"
import React from "react"
import Upload from "../Upload"
import { UploadFile } from '../Upload'
import Icon from "../Icon"


// export default function Test() {
//     return (
//         <div className="test">
//             <form method='post' encType='multipart/form-data' action="https://jsonplaceholder.typicode.com/posts">
//                 <input type="file" name='myFile' />
//                 <button type='submit'>Submit</button>
//             </form>
//         </div>
//     )
// }

export default function Test() {
    const defaultFileList: UploadFile[] = [
        { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
        { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
        { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
    ]

    //检测文件上传大小，不能超过50kb
    // const checkFileSize = (file: File) => {
    //     if (Math.round(file.size / 1024) > 50) {
    //         alert('file too big')
    //         return false
    //     }
    //     return true
    // }

    //将上传的file进行一些处理，比如改名等
    // const filePromise = (file: File) => {
    //     const newFile = new File([file], 'hhhh.docx', { type: file.type })
    //     return Promise.resolve(newFile)
    // }

    return (
        <div className="test" style={{ width: '300px' }}>
            <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                defaultFileList={defaultFileList}
                name='fileName'
                data={{ 'key': 'value' }}
                headers={{ 'X-Powered-By': 'vikingship' }}
                // accept='.jpg'
                multiple={true}
                drag={true}
            // beforeUpload={checkFileSize}
            >
                <Icon icon="upload" size="5x" theme="secondary" />
                <br />
                <p>Drag file over to upload</p>
            </Upload>
        </div>
    )
}

// export default function Test() {
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files;
//         if (files) {
//             const uploadedFile = files[0];
//             const formData = new FormData()
//             formData.append(uploadedFile.name, uploadedFile)
//             console.log(files)
//             console.log(uploadedFile.name)
//             console.log(uploadedFile)
//             formData.append('hhhhh', 'Chris')
//             axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             }).then(resp => {
//                 console.log(resp)
//             })
//         }
//     }

//     return (
//         <div className='test'>
//             <input type="file" name='myFile' onChange={handleFileChange} />
//         </div>

//     )
// }


