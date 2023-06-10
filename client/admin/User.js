// import React, {useState, useEffect} from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import unicornbikeImg from './../assets/images/socialmedia.jpg'
// import Grid from '@material-ui/core/Grid'
// import auth from './../auth/auth-helper'
// import FindPeople from './../user/FindPeople'
// import Newsfeed from './../post/Newsfeed'

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     margin: 310,
//   },
//   card: {
//     maxWidth: 1050,
//     margin: 'auto',
//     marginTop: theme.spacing(5),
//     padding: theme.spacing(3),
//     marginBottom: theme.spacing(5)
//   },
//   title: {
//     padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
//     color: theme.palette.text.secondary
//   },
//   media: {
//     minHeight: 650
//   },
//   credit: {
//     padding: 40,
//     textAlign: 'right',
//     backgroundColor: '#ededed',
//     borderBottom: '1px solid #d0d0d0',
//     '& a':{
//       color: '#3f4771'
//     } 
//   }
// }))

// export default function Home({history}){
//   const classes = useStyles()
//   const [defaultPage, setDefaultPage] = useState(false)
//   const [users, setUsers] = useState([])


//   const user = async (params, credentials, user) => {
    

  
//     try {
//       const response = await fetch('/api/users/getUser', {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type':'application/json'
//         },
//       })
//       const getAddress = await response.json()

//         if(getAddress.status === 401 || !getAddress){
//             console.log("error")
//         } else {
//             console.log(getAddress)
//             setUsers(getAddress)
//         }
//     } catch(err) {
//       console.log(err)
//     }
  
// }

// const deleteUser = async (id) => {
    

  
//     try {
//       let response = await fetch('/api/users/deleteUser/'+id, {
//         method: 'DELETE',
//         headers: {
//           'Accept': 'application/json',
//         },
//       })
//       const getAddress = await response.json()

//         if(getAddress.status === 401 || !getAddress){
//             console.log("error")
//         } else {
//             console.log(getAddress)
//             alert("User is Deleted")
//         }
//     } catch(err) {
//       console.log(err)
//     }
  
// }
  

//   useEffect(()=> {
//     user()   
//   }, [])

//     return (
//       <div className={classes.root}>
//          <table>
//           <thead>
//             <tr> 
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">About</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
            
            
          
//             {users.map((item)=>{
//                 return (<>
//                     <tr>
//                             {/* <td>{item._id}</td> */}
                            
//                             <td>{item.name}</td>
//                             <td>{item.email}</td>
//                             <td>{item.about}</td>
//                             <td><button onClick={()=>deleteUser(item._id)}>Delete</button></td>          
//                    </tr>
//                       </>)
//             })}
//         </tbody>
//         </table>
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    padding: theme.spacing(3),
  },
  card: {
    maxWidth: 1050,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  tableCell: {
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/users/getUser');
        const data = response.data;
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/deleteUser/${id}`);
      setUsers(users.filter(user => user._id !== id));
      alert('User is deleted.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
          <table className={classes.table}>
            <thead className={classes.tableHeader}>
              <tr>
                <th className={classes.tableCell} scope="col">
                  Name
                </th>
                <th className={classes.tableCell} scope="col">
                  Email
                </th>
                <th className={classes.tableCell} scope="col">
                  About
                </th>
                <th className={classes.tableCell} scope="col">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className={classes.tableCell}>{user.name}</td>
                  <td className={classes.tableCell}>{user.email}</td>
                  <td className={classes.tableCell}>{user.about}</td>
                  <td className={classes.tableCell}>
                    <Button
                      variant="contained"
                      className={classes.deleteButton}
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

