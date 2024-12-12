import {
  reactExtension,
  Banner,
  BlockStack,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.payment-method-list.render-before", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="mesh-checkout-ui-ex" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return (
    // <BlockStack border={"dotted"} padding={"tight"}>
    //   <Banner title="mesh-checkout-ui-ex">
    //     {translate("welcome", {
    //       target: <Text emphasis="italic">{extension.target}</Text>,
    //     })}
    //   </Banner>
    //   <Checkbox onChange={onCheckboxChange}>
    //     {translate("iWouldLikeAFreeGiftWithMyOrder")}
    //   </Checkbox>
    // </BlockStack>
    <Checkbox onChange={onCheckboxChange}>
      I would like to receive a free gift with my
      order
    </Checkbox>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}