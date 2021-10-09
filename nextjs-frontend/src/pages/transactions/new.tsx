import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useForm } from 'react-hook-form';
import makeHttp from '../../utils/http';
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from '../../utils/model';

const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('transactions', data);
      router.push('/transactions');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container>
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('payment_date')}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              {...register('name')}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              {...register('description')}
              label="Descrição"
              required
              fullWidth
            />
            <TextField
              {...register('category')}
              select
              label="Categoria"
              required
              fullWidth
            >
              {TransactionCategoryLabels.map((cat, index) => (
                <MenuItem key={index} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register('amount', { valueAsNumber: true })}
              type="number"
              label="Valor"
              required
              fullWidth
            />
            <TextField
              {...register('type')}
              select
              label="Tipo de operação"
              required
              fullWidth
            >
              {TransactionTypeLabels.map((type, index) => (
                <MenuItem key={index} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TransactionsNewPage;
