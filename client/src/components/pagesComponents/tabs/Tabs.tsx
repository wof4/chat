import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Communication from '../communicationList/Communication';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TouchAppIcon from '@mui/icons-material/TouchApp';



import { CommunicationType } from '../../../types';
import { setSelectedUserTc, addCurrentCommunicationTc } from '../../../redux/reducers/communicationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import NoUsersPlug from '../plugs/NoUsersPlug';
import { getComLoadingStatus } from '../../../selectors';

export default function Tabs(props: any) {

  const { comList, allUsersList, setCurrentCommunication } = props
  const isLoading = useSelector(getComLoadingStatus)
  const dispatch = useDispatch()

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setCurrentCommunication(null)
  };

  const addUserInComList = (user: CommunicationType) => {
    setValue('1')

    const includeUserInConList = comList.filter((item: CommunicationType) => item._id === user._id)

    if (!includeUserInConList.length) {
      dispatch(addCurrentCommunicationTc(user))
    }
    dispatch(setSelectedUserTc(user._id))
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
          {comList && comList.length > 0
            ? <Communication
              callback={setCurrentCommunication}
              UserList={comList}
              Icon={MailOutlineIcon}
              isShowLastMesg={true}
            />
            : comList && isLoading ?
              <CircularProgress sx={{ position: 'absolute', left: '50%', bottom: '50%' }} />
              : <NoUsersPlug />
          }
        </TabPanel>

        <TabPanel sx={{ padding: "6px" }} value="2">
          <Communication
            callback={addUserInComList}
            UserList={allUsersList}
            Icon={TouchAppIcon}
            isShowLastMesg={false}
          />
        </TabPanel>

      </TabContext>
    </Box >
  );
}
