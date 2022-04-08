import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';



import { DialogType } from '../../../types';
import { CircularProgress } from '@mui/material';
import NoUsersPlug from '../plugs/NoUsersPlug';
import Users from '../UsersLists/Users';

export default function Tabs(props: any) {

  const { dialogList, allUsersList, setSelectedUser, isLoading } = props


  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setSelectedUser(null)
  };

  const openDialog = (user: DialogType) => {
    setValue('1')
    setSelectedUser(user)
  }



  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '50%' }} label="your dialogues" value="1" />
            <Tab sx={{ width: '50%' }} label="all users" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: "6px" }} value="1">
          {dialogList && dialogList.length > 0
            ? <Users
              openDialog={openDialog}
              UserList={dialogList}
              Icon={MailOutlineIcon}
              isShowLastMesg={true}
            />
            : dialogList && isLoading ?
              <CircularProgress sx={{ position: 'absolute', left: '50%', bottom: '50%' }} />
              : <NoUsersPlug />
          }
        </TabPanel>
        <TabPanel sx={{ padding: "6px" }} value="2">
          <Users
            openDialog={openDialog}
            UserList={allUsersList}
            Icon={TouchAppIcon}
            isShowLastMesg={false}
          />
        </TabPanel>
      </TabContext>
    </Box >
  );
}
