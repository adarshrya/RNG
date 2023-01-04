export type TodoCreateInput = {
    uid?: string
    created_at: Date | string
    text: string
    done: boolean
}