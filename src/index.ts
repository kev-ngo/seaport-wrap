import {} from './wrap';

/**
 * Returns a use case that will create an order.
 * The use case will contain the list of actions necessary to finish creating an order.
 * The list of actions will either be an approval if approvals are necessary
 * or a signature request that will then be supplied into the final Order struct, ready to be fulfilled.
 *
 * @param input
 * @param input.conduitKey The conduitKey key to derive where to source your approvals from. Defaults to 0 which refers to the Seaport contract.
 *                         Another special value is address(1) will refer to the legacy proxy. All other must derive to the specified address.
 * @param input.zone The zone of the order. Defaults to the zero address.
 * @param input.startTime The start time of the order. Defaults to the current unix time.
 * @param input.endTime The end time of the order. Defaults to "never end".
 *                      It is HIGHLY recommended to pass in an explicit end time
 * @param input.offer The items you are willing to offer. This is a condensed version of the Seaport struct OfferItem for convenience
 * @param input.consideration The items that will go to their respective recipients upon receiving your offer.
 * @param input.counter The counter from which to create the order with. Automatically fetched from the contract if not provided
 * @param input.allowPartialFills Whether to allow the order to be partially filled
 * @param input.restrictedByZone Whether the order should be restricted by zone
 * @param input.fees Convenience array to apply fees onto the order. The fees will be deducted from the
 *                   existing consideration items and then tacked on as new consideration items
 * @param input.salt Random salt
 * @param input.offerer The order's creator address. Defaults to the first address on the provider.
 * @param accountAddress Optional address for which to create the order with
 * @returns a use case containing the list of actions needed to be performed in order to create the order
 */

//  public async createOrder(
//   {
//     conduitKey = this.defaultConduitKey,
//     zone = ethers.constants.AddressZero,
//     startTime = Math.floor(Date.now() / 1000).toString(),
//     endTime = MAX_INT.toString(),
//     offer,
//     consideration,
//     counter,
//     allowPartialFills,
//     restrictedByZone,
//     fees,
//     salt = generateRandomSalt(),
//   }: CreateOrderInput,
//   accountAddress?: string
// ): Promise<OrderUseCase<CreateOrderAction>> {
//   const signer = this._getSigner(accountAddress);
//   const offerer = await signer.getAddress();
//   const offerItems = offer.map(mapInputItemToOfferItem);
//   const considerationItems = [
//     ...consideration.map((consideration) => ({
//       ...mapInputItemToOfferItem(consideration),
//       recipient: consideration.recipient ?? offerer,
//     })),
//   ];

//   if (
//     !areAllCurrenciesSame({
//       offer: offerItems,
//       consideration: considerationItems,
//     })
//   ) {
//     throw new Error(
//       "All currency tokens in the order must be the same token"
//     );
//   }

//   const currencies = [...offerItems, ...considerationItems].filter(
//     isCurrencyItem
//   );

//   const totalCurrencyAmount = totalItemsAmount(currencies);

//   const operator = this.config.conduitKeyToConduit[conduitKey];

//   const [resolvedCounter, balancesAndApprovals] = await Promise.all([
//     counter ?? this.getCounter(offerer),
//     getBalancesAndApprovals({
//       owner: offerer,
//       items: offerItems,
//       criterias: [],
//       multicallProvider: this.multicallProvider,
//       operator,
//     }),
//   ]);

//   const orderType = this._getOrderTypeFromOrderOptions({
//     allowPartialFills,
//     restrictedByZone,
//   });

//   const considerationItemsWithFees = [
//     ...deductFees(considerationItems, fees),
//     ...(currencies.length
//       ? fees?.map((fee) =>
//           feeToConsiderationItem({
//             fee,
//             token: currencies[0].token,
//             baseAmount: totalCurrencyAmount.startAmount,
//             baseEndAmount: totalCurrencyAmount.endAmount,
//           })
//         ) ?? []
//       : []),
//   ];

//   const orderParameters: OrderParameters = {
//     offerer,
//     zone,
//     // TODO: Placeholder
//     zoneHash: formatBytes32String(resolvedCounter.toString()),
//     startTime,
//     endTime,
//     orderType,
//     offer: offerItems,
//     consideration: considerationItemsWithFees,
//     totalOriginalConsiderationItems: considerationItemsWithFees.length,
//     salt,
//     conduitKey,
//   };

//   const checkBalancesAndApprovals =
//     this.config.balanceAndApprovalChecksOnOrderCreation;

//   const insufficientApprovals = checkBalancesAndApprovals
//     ? validateOfferBalancesAndApprovals({
//         offer: offerItems,
//         criterias: [],
//         balancesAndApprovals,
//         throwOnInsufficientBalances: checkBalancesAndApprovals,
//         operator,
//       })
//     : [];

//   const approvalActions = checkBalancesAndApprovals
//     ? await getApprovalActions(insufficientApprovals, signer)
//     : [];

//   const createOrderAction = {
//     type: "create",
//     getMessageToSign: () => {
//       return this._getMessageToSign(orderParameters, resolvedCounter);
//     },
//     createOrder: async () => {
//       const signature = await this.signOrder(
//         orderParameters,
//         resolvedCounter,
//         offerer
//       );

//       return {
//         parameters: { ...orderParameters, counter: resolvedCounter },
//         signature,
//       };
//     },
//   } as const;

//   const actions = [...approvalActions, createOrderAction] as const;

//   return {
//     actions,
//     executeAllActions: () =>
//       executeAllActions(actions) as Promise<OrderWithCounter>,
//   };
// }
