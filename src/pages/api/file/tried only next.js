import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: '4mb' // Set desired value here
//         }
//     }
// }

export const config = {
    api: {
        bodyParser: false,
          
    }
}
export const POST = async (req, res) => {

    const { newPath } = req.query
    let fixedPath = newPath.split(',').join('/')
    console.log(fixedPath)
    console.log('in post')

    // console.log(req)
    const formData = await req.formData();
    // console.log(formData)

    const file = formData.get("file");
    console.log(file)

    // if (!file) {
    //     return NextResponse.json({ error: "No files received." }, { status: 400 });
    // }

    // const buffer = Buffer.from(await file.arrayBuffer());
    // const filename = Date.now() + file.name.replaceAll(" ", "_");
    // console.log(filename);
    // try {
    //     await writeFile(
    //         path.join(process.cwd(), "public/uploads/" + filename),
    //         buffer
    //     );
    //     return NextResponse.json({ Message: "Success", status: 201 });
    // } catch (error) {
    //     console.log("Error occured ", error);
    //     return NextResponse.json({ Message: "Failed", status: 500 });
    // }
};


export default POST