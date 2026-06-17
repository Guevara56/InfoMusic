import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Label',
        href: '/labels/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        country: '',
        description: '',
        logo: '',
        website: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('labels.store'));
    }

    const countryOptions = countries
        .map(c => ({
            value: c.translations?.spa?.common || c.name.common,
            label: `${c.flag} ${c.translations?.spa?.common || c.name.common}`
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Label" />

            <div className="w-8/12 p-4">
                <div className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            placeholder="Record Label Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="country">Country</Label>
                        <Select
                            value={countryOptions.find(o => o.value === data.country) || null}
                            onChange={o => setData('country', o?.value || '')}
                            options={countryOptions}
                            placeholder="Select a country"
                            isSearchable
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.125rem',
                                    minHeight: '42px',
                                    backgroundColor: '#111827',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50,
                                    backgroundColor: '#1f2937',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? '#374151'
                                        : '#1f2937',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#9ca3af',
                                }),
                            }}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="About this record label..."
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="logo">Logo URL (Optional)</Label>
                        <Input
                            type="url"
                            placeholder="https://..."
                            value={data.logo}
                            onChange={(e) => setData('logo', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                            type="url"
                            placeholder="https://..."
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />
                    </div>

                    <Button
                        disabled={processing}
                        onClick={handleSubmit}
                        className="mt-4"
                    >
                        {processing ? 'Creating...' : 'Add Label'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}