import axios from "axios";
import { useState } from "react";

const useRequest = ({url, method, body, onSuccess}) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if (onSuccess) { //if onSuccess callback is provided
                onSuccess(response.data); //call onSuccess
            }
            return response.data
        } catch(err){
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(e => <li key={e.message}> {e.message}</li>)}
                    </ul>
                </div>
            )
        }
    }

    return {doRequest, errors};
};

export default useRequest;