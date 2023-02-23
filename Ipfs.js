import React, { useState } from 'react'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { Buffer } from 'buffer';
const client = create('https://ipfs.infura.io:5001/api/v0');
const Ipfs = () => {
    const [file, setFile] = useState('');

    const [urlArr, setUrlArr] = useState([]);


    // const projectId = <Infura Project id>
// const projectSecret=< Infura project Secret>
    

    // const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
    /* Create an instance of the client */
    const client = create({
        host: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        port: 5001,
        protocol: 'https',
        headers: {
            Authorization: auth,
        }
    })


    const retrieveFile = async (e) => {
        const file = e.target.files[0];
        setFile(file);
        // try {
        //     const added = await client.add(file);
        //     const url = `https://infura-ipfs.io/ipfs/${added.path}`
        //     setFile(url)

        // } catch (error) {
        //     console.log(error, "error");
        // }


        const reader = new window.FileReader();
        // reader.readAsArrayBuffer(data);
        // reader.onloadend = () => {
        //     setFile({ buffer: Buffer(reader.result) });
        //     //     // console.log("    data is ", Buffer(reader.result))
        //     // }
        //     e.preventDefault();
        // }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("hello")
            const created = await client.add(file);

            console.log(created, "created")
            const url = `https://api.pinata.cloud/pinning/pinFileToIPFS${created.path}`;
            setUrlArr(prev => [...prev, url]);
        } catch (error) {
            console.log(error.message, "error");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* <input type="file" name="data" >Name</input>

                <input type="file" name="data" >PhoneNo</input> */}
                <input type="file" name="data" onChange={retrieveFile} />

                <button type="submit">Upload File</button>
                {urlArr.length !== 0 ? urlArr.map((el) => <img src={el} alt="nfts" />) :
                    <h3>Upload Data</h3>}
            </form>
        </div>
    )
}

export default Ipfs
