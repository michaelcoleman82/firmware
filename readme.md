# EBWU Hardware and Firmware

## Prerequisites
- [CircuitMaker](https://documentation.circuitmaker.com/display/CMAK/Exploring+CircuitMaker)
- [Pullup/Pulldown Resistors](https://youtu.be/Bqk6M_XdIC0)

## Simulation
![](https://i.gyazo.com/20176a50192b01a4889ca95adfe1943e.gif)

*Click **[here](http://everycircuit.com/circuit/6401615620997120)** to modify the simulation*


- The sheets are modeled by the two SPST switches, the 3v3 logic is pin 1 on the Pi.

- To the right of the switches are pulldown resistor configurations that is set up *internally* by the Pi.  
- The leds and the AND gate make up a simple representation of the sheet state and are **not** actual discreet components.  

**Note:**  No extra discreet component are needed at this stage.

## Schematic
![](https://i.gyazo.com/1bff751de9968f71f67f46dd702b3a3a.png)
*Click **[here](https://workspace.circuitmaker.com/Projects/Details/Joe-Narvaez/ebwu)** to modify the schematic*

- The Pi connector and the 4 button connectors are built per spec. Together these components make up the harness for easy setup of product.

- The schematic is to simply show all the connection and to introduce professional design software into the product. There are **no** PCB footprints at this stage.  

**Note:** That on pin 1 of the Pi Connector (J2), there is a node that splits the voltage. Physically, this occurs inside the connector. The two wires are crimped into the same housing.


# Firmware
