import React, { useState } from 'react';
import filterHeaders from './filterHeaders';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Slider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PrintIcon from '@mui/icons-material/Print';

  const DynamicFilterMapping = () => {
    const [selectedMainHeader, setSelectedMainHeader] = useState(filterHeaders[0]);
    const [openIndex, setOpenIndex] = useState(-1);
    const [selectedItems, setSelectedItems] = useState({});
    const [allSelectedItems, setAllSelectedItems] = useState([]);
  
    const handleMainHeaderChange = (event) => {
      const selectedHeader = filterHeaders.find(
        (header) => header.title === event.target.value
      );
      setSelectedMainHeader(selectedHeader);
      setSelectedItems({});
      setOpenIndex(-1);
      setAllSelectedItems([]);
    };
  
    const handleSubHeaderClick = (index) => {
      setOpenIndex(index === openIndex ? -1 : index);
    };
  
    const handleCheckboxToggle = (subHeader, item) => () => {
      const currentSelectedItems = selectedItems[subHeader] || [];
      const newSelectedItems = [...currentSelectedItems];
  
      const currentIndex = newSelectedItems.indexOf(item);
      if (currentIndex === -1) {
        newSelectedItems.push(item);
      } else {
        newSelectedItems.splice(currentIndex, 1);
      }
  
      setSelectedItems({
        ...selectedItems,
        [subHeader]: newSelectedItems,
      });
  
      updateAllSelectedItems(subHeader, newSelectedItems);
    };
  
    const handleRadioChange = (subHeader, event) => {
        const value = event.target.value;
    
        setSelectedItems({
          ...selectedItems,
          [subHeader]: value,
        });
    
        updateAllSelectedItems(subHeader, value);
      };

      const handleSliderChange = (subHeader, value) => {
        setSelectedItems({
          ...selectedItems,
          [subHeader]: value,
        });
    
        updateAllSelectedItems(subHeader, value);
      };
  
      const handleDropdownChange = (subHeader, event) => {
        const value = event.target.value;
    
        setSelectedItems({
          ...selectedItems,
          [subHeader]: value,
        });
    
        updateAllSelectedItems(subHeader, value);
      };
  
    const updateAllSelectedItems = (subHeader, items) => {
      const updatedItems = [...allSelectedItems];
      const existingIndex = updatedItems.findIndex((item) => item.title === subHeader);
      if (existingIndex !== -1) {
        updatedItems[existingIndex].items = items;
      } else {
        updatedItems.push({ title: subHeader, items });
      }
      setAllSelectedItems(updatedItems);
    };
  
    const handlePrintSelectedItems = () => {
      console.log('All Selected Items:', allSelectedItems);
    };
  
    return (
      <div>
        <Select value={selectedMainHeader.title} onChange={handleMainHeaderChange}>
          {filterHeaders.map((header) => (
            <MenuItem key={header.title} value={header.title}>
              {header.title}
            </MenuItem>
          ))}
        </Select>
        {selectedMainHeader.items.map((subHeader, index) => (
          <div key={subHeader.title}>
            <Typography variant="h6" onClick={() => handleSubHeaderClick(index)}>
              {subHeader.title}
              {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Typography>
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subHeader.type === 'checkbox' &&
                  subHeader.items.map((item) => (
                    <ListItem key={item}>
                      <ListItemIcon>
                        <Checkbox
                          checked={(selectedItems[subHeader.title] || []).includes(item)}
                          tabIndex={-1}
                          disableRipple
                          onChange={handleCheckboxToggle(subHeader.title, item)}
                        />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                {subHeader.type === 'radio' && (
                <RadioGroup
                  value={selectedItems[subHeader.title] || ''}
                  onChange={(event) => handleRadioChange(subHeader.title, event)}
                >
                  {subHeader.items.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              )}
                {subHeader.type === 'dropdown' && (
                <Select
                  value={selectedItems[subHeader.title] || ''}
                  onChange={(event) => handleDropdownChange(subHeader.title, event)}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subHeader.items.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
              {subHeader.type === 'slider' && (
            <div>
              <Typography id="discrete-slider" gutterBottom>
                {subHeader.title}
              </Typography>
              <Slider
                value={selectedItems[subHeader.title] || 0}
                onChange={(_, value) => handleSliderChange(subHeader.title, value)}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={1000}
              />
            </div>
          )}
              </List>
            </Collapse>
            <Divider />
          </div>
        ))}
        <IconButton onClick={handlePrintSelectedItems}>
          <PrintIcon />
        </IconButton>
      </div>
    );
  };
  
  export default DynamicFilterMapping;
