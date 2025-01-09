import { ref,computed } from "vue";

const useSearch = (items) =>
{

    const searchTerm = ref('');
    const filters = ref(['title']);

    const filteredItems = computed(() => {
        if (!searchTerm.value.trim()) 
            return items;

        return items.filter((item)=> {
            filters.value.some((filter)=>{
                String(item[filter]).toLowerCase().includes(searchTerm.value.toLowerCase());
            })
        })
    });

    return {
        searchTerm,
        filters,
        filteredItems,
    }
}

export default useSearch;