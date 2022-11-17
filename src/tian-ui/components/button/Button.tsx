import { defineComponent,type Ref, type PropType, type CSSProperties, type ExtractPropTypes } from 'vue'




export default defineComponent({
    emits:['click'],
    setup(props, {emit}) {
        emit('click')
    }
})