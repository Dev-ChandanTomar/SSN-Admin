export const createAddress = "/create-address";
export const createConnections = "/create-connection";
export const getConnectionByUserID = "/get-connection-by-user-id";
export const getConnections = "/get-connections";
export const validateUser = "/validate-user";
export const updateAdmin = "/update-admin";
// Admin Routes

export const updateAddress = "/update-address";
export const rejectWithdrawl = "/reject-withdraw";
export const sourcetype = "/get-source-by-type";
export const getNotifications = "/get-notifications";
export const getAdmins = "/get-admins";
export const deleteUser = "/delete-user";
export const activateStaff = "/activate-staff";
// Press-Reliese Routes
export const getAllPressReliese = "/get-all-pressreliese";
export const createPressReliese = "/create-pressrelease";
export const searchPressReliese = "/search-pressreliese";
export const deletePressRelieseById = "/delete-pressreliese";
export const updatePressReliese = "/update-pressreliese";
export const getPressRelieseById = "/get-pressreliese/:id";

// Video-Gallery Routes
export const getAllVideoGallery = "/get-all-videogallery";
export const createVideoGallery = "/create-videogallery";
export const searchVideoGallery = "/search-videogallery";
export const deleteVideoGalleryById = "/delete-videogallery";
export const updateVideoGallery = "/update-videogallery";
export const getVideoGalleryById = "/get-videogallery/:id";

// Photo-Gallery Routes

export const getAllPhotosGallery = "/get-all-photos";
export const createPhotosGallery = "/create-photos";
export const createMultiplePhotosGallery = "/create-multiple-photos";
export const serachPhotosGallery = "/search-photos";
export const deletePhotosGalleryById = "/delete-photos";
export const updatePhotosGallery = "/update-photos";
export const getPhotosGalleryById = "/get-photos/:id";

// Live Routes

export const getAllLive = "/get-all-live";
export const createLive = "/create-live";
export const deleteLiveById = "/delete-live";
export const updateLive = "/update-live";
export const getLiveById = "/get-live/:id";

// Committee Members Routes

export const getCommitteMembers = "/all-committee-members";
export const getCommitMembersById = "/single-committee-members";
export const createCommitteMembers = "/add-committee-members";
export const updateCommitteMembers = "/update-committee-members";
export const deleteCommitteMembers = "/delete-committee-members";

// Organisation Routes

export const getAllOrganisation = "/get-all-organisations";
export const getOrganisationById = "/get-organisation/:id";
export const createOrganisation = "/create-organisation";
export const updateOrganisation = "/update-organisation";
export const deleteOrganisation = "/delete-organisation";

// export const

export const getIncomes = "/get-incomes";
export const getIncomeById = "/get-income-by-id";
export const getIncomeByUserId = "/get-income-by-user-id";
export const updateIncome = "/update-income";
export const deleteIncome = "/delete-income";
export const createIncome = "/create-income";
export const getAllUsers = "/get-all-users";
export const getAllUsersName = "/get-all-users-name";
export const getAllEvent = "/get-all-events";
export const createEvent = "/create-event";
export const updateEvent = "/update-event";
export const delteEvent = "/delete-event";
export const getKyc = "/get-kyc";
export const createKyc = "/create-kyc";
export const getKycById = "/get-kyc-by-id";
export const getKycByUserId = "/get-kyc-by-user-id";
export const updateKyc = "/update-kyc";
export const updateTemple = "/update-temple";
export const uploadImage = "/upload-images";
export const deleteKyc = "/delete-kyc";
export const deleteTemple = "/delete-temple";
export const getComments = "/get-all-comments";
export const createComment = "/delete-temple";
export const updateComment = "/update-comment";
export const deleteComment = "/delete-comment";

export const getLimitReward = "/get-claims";
export const getPendingWithdraw = "/get-pending-withdraw";
export const createLimitReward = "/create-claims";
export const getLimitRewardById = "/get-user-claims";
export const updateLimitReward = "/update-claim";
export const deleteLimitReward = "/delete-claim";

export const getAboutus = "/get-all-about";
export const createAbout = "/create-about";
export const updateAbout = "/update-about";
export const deleteAbout = "/delete-about";
export const getAboutById = "/get-about";
export const getProducts = "/get-all-temples";
export const createProduct = "/create-temple";
export const getPublished = "/get-published";
export const getProductByType = "/get-product-by-type";
export const getProductById = "/get-product-by-id";
export const updateProduct = "/update-product";
export const deleteProduct = "/delete-product";

export const getRents = "/get-rents";
export const getActiveRent = "/get-active-rent";
export const filterRent = "/filter-rent";
export const createRent = "/create-rent";
export const getRentById = "/get-rent-by-id";
export const getRentByUserId = "/get-rent-by-user-id";
export const updateRent = "/update-rent";
export const deleteRent = "/delete-rent";

export const getRewards = "/get-rewards";
export const createReward = "/create-reward";
export const getRewardById = "/get-reward-by-id";
export const updateReward = "/update-reward";
export const deleteReward = "/delete-reward";

export const getRoyalties = "/get-Royality";
export const createRoyality = "/create-royality";
export const getRoyalityById = "/get-royality-by-id";
export const updateRoyality = "/update-royality";
export const deleteRoyality = "/delete-royality";

export const getSources = "/get-sources";
export const createSource = "/create-source";
export const getSourceById = "/get-source-by-id";
export const getSourceByType = "/get-source-by-type";
export const updateSource = "/update-source";
export const deleteSource = "/delete-source";

export const getTds = "/get-tds";
export const getTdsById = "/get-tds-by-id";
export const updateTds = "/update-tds";
export const deleteTds = "/delete-tds";

export const getUsers = "/get-users";
export const login = "/login";
export const adminLogin = "/login";
export const getAdminById = "/get-admin-by-id";
export const activateAccount = "/activate-acc";
export const registerUser = "/register-user";
export const registerNetworkUser = "/register-nextwork-user";
export const activeConnection = "/get-active-connection";
export const allotedConnection = "/get-alloted-connection";
export const inActiveConnection = "/get-inactive-connection";
export const getMembers = "/get-members";
export const registerAdmin = "/register-member";
export const forgetPassword = "/forget-password";
export const getUserById = "/user-by-id";
export const verifyOtp = "/verify-admin-otp";
export const getVerifications = "/get-verifications";
export const resendOtp = "/resend-otp";
export const sendOtp = "/send-admin-otp";

export const updateUser = "/update-user";
export const ifscValidate = "/ifsc-validate";
export const changePassword = "/change-password";
export const updateProfilePhoto = "/update-profile-photo";

export const getUsersTransactions = "/get-all-donations";
export const purchase = "/purchase";
export const createTransaction = "/create-transaction";
export const getTransactionById = "/get-transaction-by-id";
export const getTransactionsByUserId = "/get-transactions-by-user-id";
export const updateTransactions = "/update-transactions";
export const getTransactionByType = "/get-transaction-by-type";
export const filterTransactions = "/filter-transactions";
export const deleteUserTrans = "/delete-user-trans";

export const AddRoyality = "/add-royality";
export const AddConsultation = "/add-consultations";
export const AddSources = "/add-source";
export const AddProducts = "/add-product";
export const getBusinessTransaction = "/get-business-transaction";
export const createBusinessTransaction = "/create-business-transaction";
export const updateBusinessTransaction = "/update-business-transaction";
export const deleteBusinessTransaction = "/delete-business-transaction";

export const getConsultationByType = "/get-consultation-by-type";
export const createConsultation = "/create-consultation";
export const updateConsultation = "/update-consultation";
export const deleteConsultation = "/delete-consultation";

export const getAllRoute = "/get-routes";
export const createRoute = "/create-route";
export const updateRoute = "/update-route";
export const deleteRoute = "/delete-route";
export const getTemple = "/get-temple";
export const getAllAdmin = "/get-all-admin";
