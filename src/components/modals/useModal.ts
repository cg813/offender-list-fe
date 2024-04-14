import { inject, ref } from "vue"

export const useModal = (modalName: string) => {
  const $vfm: any = inject('$vfm')
  const show = (params?: any) => $vfm.show(modalName, params)
  const hide = () => $vfm.hide(modalName)
  const modalClosing = (event: any) => event.stop()
  const showModal = ref(false)

  return {
    modalName,
    show,
    hide,
    modalClosing,
    showModal
  }
}
