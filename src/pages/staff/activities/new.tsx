
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "O nome da atividade deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  scheduled_date: z.string().min(1, "A data de agendamento é obrigatória"),
  patient_id: z.string().uuid("ID do paciente inválido"),
});

const NewActivityPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buscar lista de pacientes ativos
  const { data: patients, isLoading: isLoadingPatients } = useQuery({
    queryKey: ["active-patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("id, first_name, last_name")
        .eq("status", "active")
        .order("first_name");

      if (error) throw error;
      return data;
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      scheduled_date: "",
      patient_id: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("activities")
        .insert({
          name: data.name,
          description: data.description || null,
          scheduled_date: new Date(data.scheduled_date).toISOString(),
          patient_id: data.patient_id,
        });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Atividade agendada com sucesso.",
      });
      
      navigate("/staff/activities");
    } catch (error) {
      console.error("Erro ao agendar atividade:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Ocorreu um erro ao agendar a atividade. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/staff/activities")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Atividades
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Agendar Nova Atividade</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="patient_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paciente</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={isLoadingPatients}
                    >
                      <option value="">Selecione um paciente</option>
                      {patients?.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.first_name} {patient.last_name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Atividade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ex: Sessão de Fisioterapia" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Detalhes sobre a atividade..."
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scheduled_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data e Hora</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local" 
                      {...field}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/staff/activities")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || isLoadingPatients}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Agendando..." : "Agendar Atividade"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewActivityPage;
