
import { reactive } from "vue";

const useListAction = (items = []) =>
{
    const blogs = reactive({
        list: [...items]
    });

    const addItem = (item) =>
    {
        data.list.push(item);
    }

    const removeItem = (id) =>
    {
        data.list.splice(id,1);
    }

    return {
        addItem,
        removeItem
    }
}

export default useListAction ;