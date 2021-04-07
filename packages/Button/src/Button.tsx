import { defineComponent, PropType, computed, mergeProps } from "vue"
import { isColor } from "../../utils/assist"

type actionType = PropType<'button' | 'submit' | 'reset'>
type buttonType = PropType<'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text'>
type sizeType = PropType<'mini' | 'small' | 'large'>
type shareType = PropType<'square' | 'circle' | 'angle'>

require("../../styles/components/button.less")
export default defineComponent({
    name: 'ydButton',
    props: {
        actionType: {
            type: String as actionType,
            validator: (val: string) => {
                return ['button', 'submit', 'reset'].includes(val)
            },
            default: 'button'
        },
        type: {
            type: String as buttonType,
            validator: (val: string) => {
                return ['primary', 'danger', 'warning', 'hollow', 'disabled'].includes(val)
            },
            default: 'primary'
        },
        shape: {
            type: String as shareType,
            validator: (val: string) => {
                return ['square', 'circle', 'angle'].includes(val)
            },
            default: 'square'
        },
        size: {
            type: String as sizeType,
            validator: (val: string) => {
                return ['mini', 'small', 'large'].includes(val)
            },
            default: 'large'
        },
        bgcolor: {
            validator: (val: string) => {
                if (!val) return true
                return isColor(val)
            }
        },
        color: {
            validator: (val: string) => {
                if (!val) return true
                return isColor(val)
            }
        },
        loadingTxt: String,
        disabled: Boolean,
        loading: {
            type: Boolean,
            default: false
        },
    },
    setup(props, ctx) {
        const { disabled, size, loading, bgcolor, actionType, loadingTxt } = props

        // 计算属性
        const classes = computed(() => {
            let s = ''
            if (props.size === 'mini') {
                s = 'yd-btn-mini'
            } else {
                s = props.size === 'large' ? 'yd-btn-block' : 'yd-btn'
            }
            let t = 'yd-btn-' + props.type

            if (props.bgcolor) {
                t = ''
            }

            if (props.disabled) {
                t = 'yd-btn-disabled'
            }

            let r = ''
            if (props.shape === 'angle') {
                r = 'yd-btn-angle'
            } else {
                r = props.shape === 'circle' ? ' yd-btn-circle' : ''
            }

            return s + " " + t + " " + r
        })

        const rollingClasses = computed(() => {
            let a = '';
            if (props.size === 'mini') {
                a = 'yd-btn-rolling-mini';
            } else if (!props.size || props.size === 'small') {
                a = 'yd-btn-rolling-small';
            } else {
                a = 'yd-btn-rolling-large';
            }
            return a
        })
        
        // 合并class
        const { rollClass } = mergeProps({ rollClass: 'yd-btn-rolling' }, { rollClass: rollingClasses.value })
        return () => {
            return (
                <button disabled={disabled || loading} class={classes.value} style={`backgroundColor:${bgcolor}`} type={actionType}>
                    {
                        loading && <span class="yd-btn-loading">
                            <span class={rollClass} style={{ marginRight: loadingTxt ? '8px' : '0' }}> <i></i></span>
                            {size === 'large' && <span>{loadingTxt}</span>}
                        </span>
                    }
                    <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{ctx.slots.default && ctx.slots.default()}</span>
                </button>
            )
        }
    }
})