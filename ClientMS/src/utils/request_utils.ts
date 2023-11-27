import axios, { AxiosError } from "axios";
import { Response } from "express";
import { getErrorMessage, reportError } from "./error_utils";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function fetcher(
    res: Response,
    url: string,
    method: HttpMethod,
    body = null,
    params = null
) {
    try {
        const axiosConfig = {
            method: method || "GET",
            data: body,
            params: params,
        };

        const { data: result } = await axios(url, axiosConfig);
        if (result.status === 200) {
            res.status(200).json(result.data);
            return
        }
        if (result.status === 404) {
            res.status(404).json(result.message);
        }
        else if (result.status === 400) {
            res.status(400).json(result.message);
        } else if (result.status === 500) {
            res.status(500).json(result.message);
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } catch (error) {
        console.log(error)
        if (error instanceof AxiosError) {
            const err = error as AxiosError;
            res.status(err.response?.status || 500).json({ error: err.response?.data });
        } else {
            reportError({ message: getErrorMessage(error) });
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
