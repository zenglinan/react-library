import React from 'react'
import axios from 'axios'

interface ILoadState {
    data: any,
    isLoading: boolean
}
interface ILoadProps {
    data: any
}
const WithLoader = <P extends ILoadState>(WrappedComponent: React.ComponentClass<P, P>, url: string) => {
    return class LoaderComponent extends React.Component<Partial<ILoadProps>, ILoadState>{
        constructor(props: any) {
            super(props);
            this.state = {
                data: null,
                isLoading: false
            }
        }
        componentDidMount() {
            this.setState({
                isLoading: true,
            })
            axios.get(url).then(result => {
                this.setState({
                    data: result.data,
                    isLoading: false
                })
            })
        }
        render() {
            const { data, isLoading } = this.state
            return (
                <>
                    {(isLoading || !data) ? <p>data is loading</p> :
                        <WrappedComponent {...this.props as P} data={data} />
                    }
                </>
            )
        }
    }
}

export default WithLoader



