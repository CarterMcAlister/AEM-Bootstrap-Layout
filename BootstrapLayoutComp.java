package bootstrap.components;

import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;

public class BootstrapLayoutComp extends WCMUsePojo {

    final private String[] breakpointSizes = {"xs", "sm", "md", "lg"};
    private String columnClasses = "";

    @Override
    public void activate() throws Exception {

        // Loop through breakpoint sizes and build classes
        for (String breakpointSize : breakpointSizes) {
            // Check if breakpoint size is enabled
            if (getProperties().get(breakpointSize, false)) {
                // Build column size class
                String colSize = "columnSize" + breakpointSize.toUpperCase();
                columnClasses += " col-" + breakpointSize + "-" + getProperties().get(colSize, "12");
                
                // Build column offset class
                String offsetOrderingDropdown = "offsetOrderingSize" + breakpointSize.toUpperCase();
                String offsetOrderingNumber = getProperties().get(offsetOrderingDropdown, "None");

                if(!offsetOrderingNumber.equals("None")) {
                    String offsetAndOrderingRadio = "offsetsColOrdering" + breakpointSize.toUpperCase();
                    String offsetAndOrderingValue = getProperties().get(offsetAndOrderingRadio, "");

                    if(offsetAndOrderingValue.length() > 0) {
                        columnClasses += " col-" + breakpointSize + "-" + offsetAndOrderingValue + "-" + offsetOrderingNumber;

                    }
                }
            }
        }
    }

    public String getColumnClasses() {
        return columnClasses;
    }
}

