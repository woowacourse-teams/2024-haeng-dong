import React from 'react';
import Switch from '../Switch/Switch';
import {useState} from 'react';

export interface NavSwitchProps {
  paths: string[];
  defaultPath?: string;
  onChange: (path: string) => void;
}

const NavSwitch: React.FC<NavSwitchProps> = ({paths, defaultPath, onChange}) => {
  const [path, setPath] = useState(defaultPath ?? paths[0]);

  const handlePath = (path: string) => {
    setPath(path);
    onChange(path);
  };

  return <Switch value={path} values={paths} onChange={handlePath} />;
};

export default NavSwitch;
