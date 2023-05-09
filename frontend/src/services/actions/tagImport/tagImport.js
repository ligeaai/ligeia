import TagService from "../../api/tags";

export const importExelFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        let res = await TagService.importExel(formData)

    } catch (err) {
        console.log(err);
    }
}