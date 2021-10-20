import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgresss?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgresss, onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag,
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj } as UploadFile
                } else {
                    return file
                }
            })
        })
    }
    //将type为file的input点击事件转移到button上
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }

    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + "upload-file",
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        // setFileList([_file, ...fileList])这样写会导致上传多个文件只显示一个
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formData = new FormData()
        formData.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            //显示上传进度
            onUploadProgress: (e) => {
                console.log(e)
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(percentage)
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: "uploading" })
                    if (onProgresss) {
                        onProgresss(percentage, file)
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            updateFileList(_file, { status: "success", response: resp.data })
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch(err => {
            console.error(err)
            updateFileList(_file, { status: "error", error: err })
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    console.log(fileList)
    return (
        <div className='viking-upload-component' >

            {/* <Button btnType='primary' onClick={handleClick}>Upload File</Button> */}
            <div className='viking-upload-input' onClick={handleClick}>
                {drag ? <Dragger onFile={(files) => { uploadFiles(files) }}>{children}</Dragger> : { children }}
                <input
                    className='viking-file-input'
                    style={{ display: 'none' }}
                    ref={fileInput} type="file"
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <UploadList fileList={fileList} onRemove={handleRemove} />

        </div>
    )
}

export default Upload