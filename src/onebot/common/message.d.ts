import { BotActionParams } from "../actions/interfaces"

export declare namespace BotMessage {

  /**
   * 发送消息
   * 
   * bot -> framework
   */
  export interface SendMsg extends BotActionParams {
    detail_type: 'private' | 'group'
    group_id?: `${number}`
    user_id?: string
    message: SendElement[]
  }

  /**
   * 撤回消息
   */
  export interface DeleteMsg {
    message_id: string
  }

  /**
   * 消息基础类型
   * 
   * bot -> framework
   */
  export interface SendElement {
    /**
     * text - 纯文本的内容
     * 
     * mention - At消息
     * 
     * mention_all - At所有成员
     * 
     * image - 图片（未实现）
     * 
     * vioce - 语音消息（未实现）
     * 
     * viedo - 视频消息（未实现）
     * 
     * file - 文件消息（未实现）
     * 
     * location - 位置消息（未实现）
     * 
     * reply - 引用回复
     * 
     * multiforward - 转发消息（未实现）
     * 
     */
    type: 'text' | 'mention' | 'mention_all' | 'image' | 'vioce' | 'audio' | 'video' | 'file' | 'location' | 'reply' | 'multiforward'
    data: {
      /**
       * 纯文本的内容
       */
      text?: string

      /**
       * 图片
       */
      pic?: BotMessageSendElements.PicElement

      /**
       * 图像等的文件ID
       * 
       * 待定
       */
      file_id?: string

      /**
       * At时的对象ID
       * 
       * 待定
       * 
       * 注意区分 [全体成员] 与 [群成员]
       */
      at?: BotMessageSendElements.AtElement

      /**
       * 引用回复的信息
       */
      reply?: BotMessageSendElements.ReplyElement

      /**
       * 转发消息的内容
       */
      forwardList?: SendElement[][] | `${number}`[]
    }
  }

  /**
   * 消息基础类型
   * 
   * framework -> bot
   */
  export interface ReceiveElement {
    /**
     * text - 纯文本的内容
     * 
     * mention - At消息
     * 
     * mention_all - At所有成员
     * 
     * image - 图片（未实现）
     * 
     * vioce - 语音消息（未实现）
     * 
     * viedo - 视频消息（未实现）
     * 
     * file - 文件消息（未实现）
     * 
     * location - 位置消息（未实现）
     * 
     * reply - 引用回复
     * 
     * multiforward - 转发消息（未实现）
     * 
     */
    type: 'text' | 'mention' | 'mention_all' | 'image' | 'vioce' | 'audio' | 'video' | 'file' | 'location' | 'reply' | 'multiforward'
    data: {
      /**
       * 纯文本的内容
       */
      text?: string

      /**
       * 图片
       */
      pic?: BotMessageReceiveElements.PicElement

      /**
       * 图像等的文件ID
       * 
       * 待定
       */
      file_id?: string

      /**
       * At时的对象ID
       * 
       * 待定
       * 
       * 注意区分 [全体成员] 与 [群成员]
       */
      at?: BotMessageReceiveElements.AtElement

      /**
       * 引用回复的信息
       */
      reply?: BotMessageReceiveElements.ReplyElement

      /**
       * 转发消息的内容
       */
      forwardList?: SendElement[][] | `${number}`[]
    }
  }
}

/**
 * 消息元素定义
 * 
 * bot -> framework
 */
declare namespace BotMessageSendElements {

  /**
   * 引用回复消息类型
   * 
   * bot -> framework
   */
  interface ReplyElement {
    /**
     * 消息ID
     */
    msgId: `${number}`
    /**
     * 消息序列
     */
    msgSeq: `${number}`
    /**
     * 源消息的文字内容
     */
    text: string
    /**
     * 源消息发送者的id
     */
    uid: `u_${string}`
  }

  /**
   * At特定人员
   * 
   * bot -> framework
   */
  interface AtElement {
    /**
     * 是否是全体成员
     */
    isAll: boolean
    /**
     * 用户ID
     * 
     * 
     */
    uid: string
    name?: string
  }

  /**
   * 图片
   * 
   * bot -> framework
   */
  interface PicElement {
    /**
     * simple - 普通图片
     * 
     * emoji - 表情图片
     * 
     */
    type: 'simple' | 'emoji'

    /**
     * 图片路径
     * 
     */
    path: string
  }


  /**
   * 位置消息
   */
  export interface Location {
    latitude: number
    longitude: number
    title: string
    content: string
  }

  /**
   * 引用回复消息
   */
  export interface Reply {
    message_id: string
    user_id: string
  }
}

/**
 * 消息元素定义
 * 
 * framework -> bot
 */
declare namespace BotMessageReceiveElements {

  /**
   * 引用回复消息类型
   * 
   * bot -> framework
   */
  interface ReplyElement {
    /**
     * 消息ID
     */
    msgId: `${number}`
    /**
     * 消息序列
     */
    msgSeq: `${number}`
    /**
     * 源消息的文字内容
     */
    text: string
    /**
     * 源消息发送者的id
     */
    uid: `u_${string}`
  }

  /**
   * At特定人员
   * 
   * bot -> framework
   */
  interface AtElement {
    /**
     * 是否是全体成员
     */
    isAll: boolean
    /**
     * 用户ID
     * 
     * 
     */
    uid: string
    name?: string
  }

  /**
   * 图片
   * 
   * bot -> framework
   */
  interface PicElement {
    /**
     * simple - 普通图片
     * 
     * emoji - 表情图片
     * 
     */
    type: 'simple' | 'emoji'

    /**
     * 图片宽度
     */
    width: number

    /**
     * 图片高度
     */
    height: number

    /**
     * 图片大小
     */
    size: number

    /**
     * 图片MD5
     */
    md5: string

    /**
     * 文件uuid
     */
    uuid: `${number}`

    /**
     * 图片网络地址
     * 
     * 没有host, https://gchat.qpic.cn/
     * 
     * /gchatpic_new/发送者QQ/群号-uuid-MD5/0
     */
    url: string
  }


  /**
   * 位置消息
   */
  export interface Location {
    latitude: number
    longitude: number
    title: string
    content: string
  }

  /**
   * 引用回复消息
   */
  export interface Reply {
    message_id: string
    user_id: string
  }
}