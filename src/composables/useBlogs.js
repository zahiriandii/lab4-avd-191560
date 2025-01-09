import { reactive } from "vue";
import { createClient } from "contentful";
import useListAction from "./useListAction";


const useBlogs = () =>
{
    const data = reactive({
        isLoading: false,
        isError: null 
    });

    const client = createClient({
        space: "",
        accessToken: ""
    });

    const initialBlogs = [];
    const {addItem,removeItem} = useListAction(initialBlogs);

    const fetchBlogs = async ()=>{
        data.isLoading = true;
        data.error = null;

        try {
            const response = await client.getEntries({content_type:"blog"});
            response.items.forEach(item=>{
                addItem({
                    title: item.fields.title ,
                    description: item.fields.description,
                    heroImage: item.fields.heroImage,
                    publishDate: item.fields.publishDate,
                    id: item.sys.id

                })
            })
        } catch (error) {
            data.isError = "Error fetching data";
            console.log(error);
        }
        finally
        {
            data.isLoading = false;
        }
    }

    return{
        blogs: initialBlogs,
        addItem,
        removeItem,
        fetchBlogs,
        data
    }


}
export default useBlogs;