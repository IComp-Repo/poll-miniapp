import api from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Group = {
  id: number;
  title: string;
  chat_id: string;
  fetch_date: string;
};

export const fetchGroups = async (): Promise<Group[] | undefined> => {
  try {
    return await api.get(API_ROUTES.GROUPS.SHOW);
  } catch (error: any) {
    toast.error("Erro ao recuperar grupos");
    console.error(error);
  }
};