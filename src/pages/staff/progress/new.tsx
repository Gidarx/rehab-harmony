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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  notes: z.string().min(10, "As notas de progresso devem ter pelo menos 10 caracteres"),
  patient_id: z.string().uuid("ID do paciente inválido"),
  session_date: z.string().min(1, "A data da sessão é obrigatória"),
});

const NewProgressPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
      patient_id: "",
      session_date: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Implementation will be added later
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/staff/progress")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Notas de Progresso
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Adicionar Nota de Progresso</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas de Progresso</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Digite notas detalhadas sobre o progresso do paciente..."
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="session_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da Sessão</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/staff/progress")}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? "Salvando..." : "Salvar Nota de Progresso"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewProgressPage;