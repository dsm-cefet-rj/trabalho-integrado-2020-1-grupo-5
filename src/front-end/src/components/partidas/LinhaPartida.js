import React from 'react';
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Azul from './camisaazul.png'
import Vermelho from './camisavermelha.png'
import Grid from '@material-ui/core/Grid';
import {useHistory } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    image: {
      width : 30,
      height: "auto"
    }
  }));

const LinhaPartida = (props) => {
    const classes = useStyles();
    const history  = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
    if(props != null && props.partida != null && props.partida.id != null){
        return(
          <>
            <ListItem button component={Link} to = {`/partidas/visualizar/${props.partida.id}`}>
              <Grid className={classes.root} container direction="row">           
                <Grid direction="column" item xs={12} container alignItems="center">
                      <ListItemText secondary={new Date(props.partida.data).toLocaleDateString()}/>            
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center" >
                    <img className={classes.image} alt={props.partida.time_A} src={Azul}/>
                    <br/>
                    <ListItemText secondary={props.partida.time_A}/>
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                    <h3>{props.partida.gols_time_A} X {props.partida.gols_time_B}</h3>
                </Grid>
                <Grid direction="column" item xs={4} container alignItems="center">
                    <img className={classes.image} alt={props.partida.time_B} src={Vermelho}/>
                    <br/>
                    <ListItemText secondary={props.partida.time_B}/>
                </Grid>
              </Grid>        
                <Link to={`/partidas/${props.partida.id}`}><IconButton id="edita_partida" Link to={`/partidas/${props.partida.id}`} ><EditIcon/></IconButton></Link>
                <IconButton id="deleta_partida" name="excluir_partida" onClick={handleClickOpen}><DeleteIcon /></IconButton>
            </ListItem>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Deseja mesmo excluir o item?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Você está prestes a excluir o item selecionado.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <IconButton onClick={handleClose}>
                      Cancelar
                    </IconButton>
                    <IconButton onClick={() => {props.onClickExcluirPartida(props.partida.id)}} color="secondary" autoFocus>
                      Excluir
                    </IconButton>
                  </DialogActions>
                </Dialog>
            <br/>
          </>
       );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir a partida.</td></tr>)
    }
  }

  export default LinhaPartida;