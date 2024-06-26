import { NodeIKernelStorageCleanListener } from "ntwrapper"
import { useLogger } from "../../../common/log"
import { useNTCore } from "../core"
import { useListenerProxy } from "../dispatcher"

const log = useLogger('RichMedia')

export const initStorageCleanService = () => {
    const { getWrapperSession } = useNTCore()
    const storageClean = getWrapperSession().getStorageCleanService()
    const p = useListenerProxy('KernelMsgListener')
    storageClean.addKernelStorageCleanListener(new NodeIKernelStorageCleanListener(p))
}