import {defineComponent, ref, watch} from "vue";
import request from "@/request/index.js";
import {ElSelect, ElOption} from "element-plus";
const requesetEnumSearchSelect = defineComponent({
    props: ['value', 'isUnLoad', 'searchSize', 'appendQuery', 'disabled', 'cander', 'startSearch', 'placeholder', 'showKey', 'sizeKey', 'currentKey', 'responseKey', 'valueKey', 'method', 'url', 'filters'],
    setup (props, context) {
        const emit = context.emit
        const list = ref([])
        const shake = ref(null)
        const searchData = (searchName) => {
            if (searchName === '') return
            clearTimeout(shake.value)
            shake.value = setTimeout(() => {
                request({
                    method: props.method || 'GET',
                    url: props.url,
                    [{ 'GET': 'params', 'POST': 'data' }[props.method || 'GET']]: {
                        [props.currentKey || 'current']: 1,
                        [props.sizeKey || 'size']: props.searchSize || 10,
                        [props.showKey || 'name']: searchName,
                        ...props.appendQuery
                    }
                }).then((res) => {
                    if (typeof props.filters === 'function') {
                        list.value = res.data[props.responseKey || 'list'].filter(props.filters)
                    } else {
                        list.value = res.data[props.responseKey || 'list']
                    }
                })
            }, 1000)
        }
        if (props.startSearch || props.isUnLoad) {
            searchData(props.startSearch)
        }
        watch(() => props.startSearch, () => {
            searchData(props.startSearch)
        })
        const cander = (e) => {
            emit('update:cander', e)
            emit('update:value', e[props.valueKey || 'id'])
            emit('cander', e)
        }
        const processingSlot = (item) => {
            if (context.slots.option) {
                return {
                    default: context?.slots?.option(item)
                }
            }
            return {}
        }
        return () => (
            <ElSelect
                style="width: 100%;"
                v-model={props.cander}
                value-key={props.valueKey || 'id'}
                onChange={($event) => cander($event)}
                filterable={!props.isUnLoad}
                disabled={props.disabled}
                filter-method={searchData}
                placeholder={props.placeholder}
            >
                {
                    list.value.map((item) => (
                        <ElOption
                            key={item[props.valueKey || 'id']}
                            label={item[props.showKey || 'name']}
                            value={item}
                            v-slots={processingSlot(item)}
                        >
                        </ElOption>
                    ))
                }
            </ElSelect>
        )
    }
})
export default requesetEnumSearchSelect
