"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import api from "../utils/api";
import { useMutation } from "@tanstack/react-query";
import QRCode from "qrcode.react";

const InputButton = () => {
  const [longURL, setUrl] = useState("");
  const [shortURL, setShortUrl] = useState("");
  const [mainURL, setmainURL] = useState("");
  const [open, setOpen] = useState(false);

  const { mutate: shortenUrl, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await api.post(`/`, { longURL });
        setShortUrl(data.shortURL);
        setmainURL(data.mainURL);
        console.log(data);
        return data;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <>
      <div className="flex flex-row gap-5">
        <Input
          value={longURL}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button disabled={isPending} onClick={() => shortenUrl()}>
          Shorten Url
        </Button>
      </div>
      <div className="flex flex-col p-3">
        {shortURL && (
          <div className="p-7 h-5 border flex items-center">
            <h1 className="font-bold text-lg">
              <div className="flex flex-row justify-between gap-10 items-center">
                <h1 className="text-sm">{longURL}</h1>
                <h1 className="text-sm">
                  <a
                    className="text-blue-500"
                    href={`http://localhost:9090/${shortURL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortURL}
                  </a>
                </h1>
                <Button>Copy</Button>
                <Button onClick={() => setOpen(!open)}>QR</Button>
              </div>
            </h1>
          </div>
        )}
        {shortURL && open && (
          <div className="p-7 flex items-center justify-center">
            <QRCode value={`http://localhost:9090/${shortURL}`} size={128} />
          </div>
        )}
      </div>
    </>
  );
};

export default InputButton;
