import {useEffect, useRef, useState} from 'react';
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {useLocation, useNavigate} from 'react-router-dom';
import PrivacyPolicy from '@/pages/home/PrivacyPolicy.tsx';
import TermsOfService from '@/pages/home/TermsOfService.tsx';
import {Button} from '@/components/ui/button.tsx';

export default function LegalDialog({ppHash = '#pp', tosHash = '#tos'}) {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const canClose = useRef(true);
    const isPolicy = location.hash === ppHash;

    useEffect(() => {
        setOpen(location.hash === ppHash || location.hash === tosHash);
    }, [location.hash, ppHash, tosHash]);

    const handleClose = () => {
        setOpen(false);
        navigate(location.pathname, {replace: true});
    };

    return (
        <Dialog open={canClose.current ? open : true} onOpenChange={handleClose}>
            <DialogContent className="overflow-x-hidden overflow-y-auto h-screen sm:h-[calc(100vh-20px)]">
                <DialogHeader>
                    <DialogTitle>{isPolicy ? 'Privacy Policy' : 'Terms of Service'}</DialogTitle>
                </DialogHeader>
                {
                    isPolicy ? <PrivacyPolicy/> : <TermsOfService/>
                }

                <DialogFooter>
                    <Button onClick={() => (setOpen(false), handleClose())}>OK</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}