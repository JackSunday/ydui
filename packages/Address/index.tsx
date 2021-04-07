import { defineComponent, computed, mergeProps } from "vue"

export default defineComponent({
    props: {
        name: {
            type: String,
            default: '22'
        }
    },

    setup(props, ctx) {
        const slots = {
            default: (val) => console.log(val),
            foo: () => <span>B</span>,
        };
        return () => {
            return (
                <div>
                    {ctx.slots.default()}
                </div >
            )
        }
    }
})