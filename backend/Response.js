const userDataResponse = {
    otpsent: false,
    otpverified:false,
    existinguser:false,
    duplicateEntry:false,
    token: '',
    isverifiedtoken: false,
    userAdded:false,
    userFound:false,
    userData:{
        email: '',
        username: '',
        imageurl: '',
        gender: '',
        state: ''
    },
    imageuploaded:'',
    imageurl: '',
    usernameavailable:'',
    error :"",

    flightdetailsfetched:false,
    flightdata:{
        
    },
    flightdataadded:false,
    useralreadyapplied:false,
    useraddedtoflight:false,
    useraccepted:false,
    logout:false,
    adminaccepteduser:false,

    flightusersfetched:false,
    flightuserdetails:{
        
    },
    otherflightusers:false,
    otherflightusersdetails:{
        
    },
    cabbooked:false
}

export default userDataResponse;